from PIL import Image
import os

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    # threshold for white
    for item in datas:
        # if RGB is close to white, make transparent
        if item[0] > 235 and item[1] > 235 and item[2] > 235:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    
    # get bounding box of non-transparent pixels
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")

if os.path.exists("public/logo.jpg"):
    remove_white_bg("public/logo.jpg", "public/logo-transparent.png")
elif os.path.exists("public/logo.png"):
    remove_white_bg("public/logo.png", "public/logo-transparent.png")
else:
    print("No logo found")
