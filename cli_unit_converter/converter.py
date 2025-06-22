import argparse

def celsius_to_fahrenheit(celsius):
    """Converts Celsius to Fahrenheit."""
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    """Converts Fahrenheit to Celsius."""
    return (fahrenheit - 32) * 5/9

def main():
    """
    Main function to parse arguments and perform temperature conversion.
    """
    parser = argparse.ArgumentParser(
        description="A simple CLI tool to convert temperatures.",
        epilog="Example usage: python converter.py --celsius 25"
    )

    # Use a mutually exclusive group to ensure only one temp type is provided
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument(
        "-c", "--celsius", 
        type=float, 
        help="Temperature in Celsius to convert to Fahrenheit."
    )
    group.add_argument(
        "-f", "--fahrenheit", 
        type=float, 
        help="Temperature in Fahrenheit to convert to Celsius."
    )

    args = parser.parse_args()

    if args.celsius is not None:
        result = celsius_to_fahrenheit(args.celsius)
        print(f"{args.celsius}°C is equal to {result:.2f}°F")
    elif args.fahrenheit is not None:
        result = fahrenheit_to_celsius(args.fahrenheit)
        print(f"{args.fahrenheit}°F is equal to {result:.2f}°C")

if __name__ == "__main__":
    main() 