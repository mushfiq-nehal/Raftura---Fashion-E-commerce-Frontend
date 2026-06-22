import os
from PIL import Image

src_path = "/home/nehal/Dev/Frontend/app/public/images/0.png"
dest_path = "/home/nehal/Dev/Frontend/app/public/images/hero-model-test.png"

if os.path.exists(src_path):
    img = Image.open(src_path)
    # Let's crop from y = 60 to get the full head and hair
    box = (0, 60, 550, 530)
    cropped = img.crop(box)
    cropped.save(dest_path)
    print("Test crop successful!")
else:
    print("0.png not found!")
