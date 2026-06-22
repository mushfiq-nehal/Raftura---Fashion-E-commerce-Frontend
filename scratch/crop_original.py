import os
from PIL import Image

src_path = "/home/nehal/Dev/Frontend/app/public/images/0.png"
dest_path = "/home/nehal/Dev/Frontend/app/public/images/hero-model-cropped.png"

if os.path.exists(src_path):
    img = Image.open(src_path)
    # Crop box: (left, upper, right, lower)
    # Let's crop more of the right side to get the full block and model back
    box = (0, 98, 550, 530)
    cropped = img.crop(box)
    cropped.save(dest_path)
    print("Crop successful!")
else:
    print("0.png not found!")
