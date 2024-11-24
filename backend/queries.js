export const queryData = `I want you to parse through this data and categorize all of the data into a csv format, 
      with the categories of: name of the car, the number of the car, color of the car, the driver of the car, and the time stamp of which the car enters in, and 
      the time stamp in which the car exits. I want you to list these under their respective categories as they appear, and separate it how you would a csv file, with commas. Also add the sport (formula 1, nascar, formula 2 etc), and the race name and year at the top seperated by commas.
      Your output must only be in the json dictionary form with key value pairs ({
      "SportName": "NASCAR Cup Series",
      "Year": "",
      "RaceName": "",
      "Races": [
        {
          "Car": {
            "Make": "",
            "Number": "",
            "Color": "",
            "Driver": ""
          },
          "Timestamps": {
            "Enter": "",
            "Exit": ""
          }
        },
        {
          "Car": {
            "Make": "",
            "Number": "",
            "Color": "",
            "Driver": ""
          },
          "Timestamps": {
            "Enter": "",
            "Exit": ""
          }
        }
      ]
    }). For readability, please put an "enter" or make the cars a separate line from each other instead of outputting the data one after another. No additional text. 
      If any of the information is not present, put in none as a placeholder. use this data:`;

export const twelveLabQuery = `Identify and verify cars in frame, ensuring accurate details. Provide the following information:
- Car Number
- Make
- Model
- Driver's Name
- Timestamps for when the car is fully visible and when it goes off screen.
Include:
- Sport Name
- Competition Name
- Year
- Location or Name of Race`;
