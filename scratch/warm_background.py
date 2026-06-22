import os
import numpy as np
from PIL import Image

src_image_path = "/home/nehal/Dev/Frontend/app/public/images/hero-model-cropped.png"
dest_image_path = "/home/nehal/Dev/Frontend/app/public/images/hero-model.png"

if os.path.exists(src_image_path):
    img = Image.open(src_image_path).convert("RGB")
    width, height = img.size
    
    # Target color: #ECE7E1 (236, 231, 225)
    target_r, target_g, target_b = 236, 231, 225
    
    img_data = np.array(img, dtype=np.float32)
    
    # Left and right fade boundaries to blend background seamlessly to #ECE7E1
    fade_width = 60
    
    for y in range(height):
        for x in range(width):
            r, g, b = img_data[y, x]
            
            # Calculate luminance
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            
            # Saturation check
            max_val = max(r, g, b)
            min_val = min(r, g, b)
            sat = (max_val - min_val) / (max_val + 1e-5)
            
            # Background detection
            is_bg = 0.0
            if sat < 0.20 and lum > 100:
                is_bg = (1.0 - sat / 0.20)
                
            if is_bg > 0:
                # 1. Warm the background color to match #ECE7E1
                norm_lum = lum / 235.0
                if norm_lum > 1.0:
                    norm_lum = 1.0
                factor = norm_lum ** 0.4
                
                warmed_r = 160 + (target_r - 160) * factor
                warmed_g = 160 + (target_g - 160) * factor
                warmed_b = 160 + (target_b - 160) * factor
                
                # 2. Apply edge fade to #ECE7E1 on left/right boundaries
                # Only fade background pixels to keep the model and cylinder sharp!
                edge_factor = 1.0
                if x < fade_width:
                    edge_factor = x / fade_width
                elif x > width - fade_width:
                    edge_factor = (width - x) / fade_width
                
                # Smooth curve for transition
                edge_factor = 3 * (edge_factor ** 2) - 2 * (edge_factor ** 3)
                
                final_r = warmed_r * edge_factor + target_r * (1 - edge_factor)
                final_g = warmed_g * edge_factor + target_g * (1 - edge_factor)
                final_b = warmed_b * edge_factor + target_b * (1 - edge_factor)
                
                # Blend with original pixel
                img_data[y, x, 0] = r * (1 - is_bg) + final_r * is_bg
                img_data[y, x, 1] = g * (1 - is_bg) + final_g * is_bg
                img_data[y, x, 2] = b * (1 - is_bg) + final_b * is_bg
                
    result_img = Image.fromarray(np.clip(img_data, 0, 255).astype(np.uint8))
    result_img.save(dest_image_path, "PNG")
    print("Background color warmed and selective edge fade applied successfully!")
else:
    print("Source image not found!")
