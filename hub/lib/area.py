from utils.py import ensure_list


def treated_area_name_or_code(area):
    if isinstance(area, str):
        areas = "/".split(area)
        # trim all areas
        areas = [area.strip() for area in areas]
        return areas
    elif isinstance(area, list):
        return [area.strip() for area in area]
    return ensure_list(area)