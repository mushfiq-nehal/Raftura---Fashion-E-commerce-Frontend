import os
import numpy as np
from PIL import Image

src_path = "/home/nehal/Dev/Frontend/app/public/images/vecteezy_pretty-european-woman-in-winter-fur-coat-and-stylish-dress_31416664.jpg"
dest_path = "/home/nehal/Dev/Frontend/app/public/images/hero-model.png"

if os.path.exists(src_path):
    img = Image.open(src_path).convert("RGB")
    
    # 1. Crop the model area
    # Original is 6000x4000
    # Let's crop x: 1700 to 4900 (width 3200), y: 300 to 3900 (height 3600)
    box = (1700, 300, 4900, 3900)
    cropped = img.crop(box)
    
    # Resize to standard size: 1024 x 1152
    cropped = cropped.resize((1024, 1152), Image.Resampling.LANCZOS)
    width, height = cropped.size
    
    # Target color: #E0DFDD (224, 223, 221)
    target_r, target_g, target_b = 224, 223, 221
    
    img_data = np.array(cropped, dtype=np.float32)
    
    # 2. Color correct and fade edges
    fade_width = 120
    fade_top = 80
    
    for y in range(height):
        for x in range(width):
            r, g, b = img_data[y, x]
            
            # Calculate saturation and luminance
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            max_val = max(r, g, b)
            min_val = min(r, g, b)
            sat = (max_val - min_val) / (max_val + 1e-5)
            
            # Background detection: light color, low saturation
            # In this studio shot, background is extremely neutral (sat < 0.1) and light (lum > 180)
            is_bg = 0.0
            if sat < 0.12 and lum > 175:
                is_bg = (1.0 - sat / 0.12)
                
            if is_bg > 0:
                # Map background to exact target color
                norm_lum = lum / 222.0
                if norm_lum > 1.0:
                    norm_lum = 1.0
                factor = norm_lum ** 0.5
                
                warmed_r = 180 + (target_r - 180) * factor
                warmed_g = 180 + (target_g - 180) * factor
                warmed_b = 180 + (target_b - 180) * factor
                
                # Blend with edge fade
                edge_factor = 1.0
                
                # Left/Right fade
                if x < fade_width:
                    edge_factor = min(edge_factor, x / fade_width)
                elif x > width - fade_width:
                    edge_factor = min(edge_factor, (width - x) / fade_width)
                    
                # Top fade
                if y < fade_top:
                    edge_factor = min(edge_factor, y / fade_top)
                    
                edge_factor = 3 * (edge_factor ** 2) - 2 * (edge_factor ** 3)
                
                final_r = warmed_r * edge_factor + target_r * (1 - edge_factor)
                final_g = warmed_g * edge_factor + target_g * (1 - edge_factor)
                final_b = warmed_b * edge_factor + target_b * (1 - edge_factor)
                
                img_data[y, x, 0] = r * (1 - is_bg) + final_r * is_bg
                img_data[y, x, 1] = g * (1 - is_bg) + final_g * is_bg
                img_data[y, x, 2] = b * (1 - is_bg) + final_b * is_bg
                
    result_img = Image.fromarray(np.clip(img_data, 0, 255).astype(np.uint8))
    result_img.save(dest_path, "PNG")
    print("New fur coat model cropped, background corrected to #E0DFDD, and edges faded successfully!")
else:
    print("Source image not found!")
