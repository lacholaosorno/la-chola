from PIL import Image

def remove_checkerboard_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    visited = set()
    queue = []
    
    # Add borders to queue
    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))
        
    for q in queue:
        visited.add(q)
        
    transparent = (0, 0, 0, 0)
    
    def is_bg(r, g, b, a):
        # The checkerboard in the user's JPG is light grey and white (around > 235)
        # However, due to JPEG compression, some edge pixels might be a bit darker.
        # Let's use 230 as a safe threshold for light grey checkerboard
        return r > 225 and g > 225 and b > 225
    
    head = 0
    while head < len(queue):
        x, y = queue[head]
        head += 1
        
        r, g, b, a = pixels[x, y]
        if is_bg(r, g, b, a):
            pixels[x, y] = transparent
            
            # check neighbors
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    if (nx, ny) not in visited:
                        visited.add((nx, ny))
                        queue.append((nx, ny))

    img.save(output_path, "PNG")

remove_checkerboard_bg('/home/eliceo/.gemini/antigravity/brain/a6eb5d4f-bc1e-4ef3-83d6-caf45b0052af/media__1776910041874.jpg', 'public/assets/logo.png')
print("Done")
