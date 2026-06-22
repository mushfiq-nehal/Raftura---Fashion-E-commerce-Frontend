import os
import numpy as np
from PIL import Image

src_path = "/home/nehal/Dev/Frontend/app/public/images/0.png"
dest_path = "/home/nehal/Dev/Frontend/app/public/images/hero-model.png"

if os.path.exists(src_path):
    img = Image.open(src_path).convert("RGB")
    
    # 1. Crop the original image
    # box: (left, upper, right, lower)
    box = (0, 98, 550, 530)
    cropped = img.crop(box)
    width, height = cropped.size
    
    # Target background color: #ECE7E1 (236, 231, 225)
    target_r, target_g, target_b = 236, 231, 225
    
    img_data = np.array(cropped, dtype=np.float32)
    
    # 2. Only blend the right edge background to #ECE7E1
    # Right fade boundary starts at x = 450 (width is 550)
    fade_right_start = 450
    
    for y in range(height):
        for x in range(width):
            # Only process the right edge region
            if x > fade_right_start:
                r, g, b = img_data[y, x]
                
                # Calculate saturation and luminance to identify background pixels
                lum = 0.299 * r + 0.587 * g + 0.114 * b
                max_val = max(r, g, b)
                min_val = min(r, g, b)
                sat = (max_val - min_val) / (max_val + 1e-5)
                
                # Background pixels at the right edge are light neutral grey
                if sat < 0.22 and lum > 110:
                    # Calculate fade factor (goes from 1.0 at x=450 to 0.0 at x=550)
                    factor_x = (width - x) / (width - fade_right_start)
                    
                    # Smooth curve
                    factor = 3 * (factor_x ** 2) - 2 * (factor_x ** 3)
                    
                    # Blend background pixel to match target color
                    img_data[y, x, 0] = r * factor + target_r * (1 - factor)
                    img_data[y, x, 1] = g * factor + target_g * (1 - factor)
                    img_data[y, x, 2] = b * factor + target_b * (1 - factor)
                    
    result_img = Image.fromarray(np.clip(img_data, 0, 255).astype(np.uint8))
    result_img.save(dest_path, "PNG")
    print("Cropped and selectively right-edge blended successfully!")
else:
    print("0.png not found!")
