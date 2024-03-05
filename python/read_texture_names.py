import os

def get_filenames(folder_path):
    """
    Reads a folder and returns a list of file names contained within.
    
    Args:
    - folder_path: The path to the folder whose file names you want to retrieve.
    
    Returns:
    - A list of strings, where each string is the name of a file in the folder.
    """
    # List everything in the folder
    all_entries = os.listdir(folder_path)
    
    # Filter out directories, keep only files
    file_names = [entry for entry in all_entries if os.path.isfile(os.path.join(folder_path, entry))]
    
    return file_names

# Example usage
folder_path = 'F:\\dev\\space-ships\\my-aframe-project\\public\\assets\\textures\\combined'
file_names = get_filenames(folder_path)
print(file_names)
