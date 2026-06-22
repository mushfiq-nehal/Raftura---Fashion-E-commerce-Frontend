import os
import numpy as np
from PIL import Image

src_path = "/home/nehal/.gemini/antigravity/brain/b05d597c-05dc-4b88-ac89-2cef4c2309b5/new_hero_model_1782117411551.png"
dest_path = "/home/nehal/Dev/Frontend/app/public/images/hero-model.png"

if os.path.exists(src_path):
    img = Image.open(src_path).convert("RGB")
    
    # 1. Crop the model area
    # Box: (150, 140, 874, 940)
    box = (150, 140, 874, 940)
    cropped = img.crop(box)
    width, height = cropped.size
    
    # Target color: #ECE7E1 (236, 231, 225)
    target_r, target_g, target_b = 236, 231, 225
    
    img_data = np.array(cropped, dtype=np.float32)
    
    # 2. Color correct and fade left/right edges
    fade_width = 80
    
    for y in range(height):
        for x in range(width):
            r, g, b = img_data[y, x]
            
            # Calculate saturation and luminance
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            max_val = max(r, g, b)
            min_val = min(r, g, b)
            sat = (max_val - min_val) / (max_val + 1e-5)
            
            # Background detection: light color, low saturation
            # The background in the generated image is very neutral (sat < 0.22)
            is_bg = 0.0
            if sat < 0.22 and lum > 110:
                is_bg = (1.0 - sat / 0.22)
                
            if is_bg > 0:
                # Map background to exact #ECE7E1
                norm_lum = lum / 225.0
                if norm_lum > 1.0:
                    norm_lum = 1.0
                factor = norm_lum ** 0.4
                
                warmed_r = 160 + (target_r - 160) * factor
                warmed_g = 160 + (target_g - 160) * factor
                warmed_b = 160 + (target_b - 160) * factor
                
                # Blend with edge fade
                edge_factor = 1.0
                if x < fade_width:
                    edge_factor = x / fade_width
                elif x > width - fade_width:
                    edge_factor = (width - x) / fade_width
                    
                edge_factor = 3 * (edge_factor ** 2) - 2 * (edge_factor ** 3)
                
                final_r = warmed_r * edge_factor + target_r * (1 - edge_factor)
                final_g = warmed_g * edge_factor + target_g * (1 - edge_factor)
                final_b = warmed_b * edge_factor + target_b * (1 - edge_factor)
                
                img_data[y, x, 0] = r * (1 - is_bg) + final_r * is_bg
                img_data[y, x, 1] = g * (1 - is_bg) + final_g * is_bg
                img_data[y, x, 2] = b * (1 - is_bg) + final_b * is_bg
                
    result_img = Image.fromarray(np.clip(img_data, 0, 255).astype(np.uint8))
    result_img.save(dest_path, "PNG")
    print("New model cropped, background warmed, and edge-faded successfully!")
else:
    print("Source image not found!")
