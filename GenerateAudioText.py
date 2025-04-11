import openai
import speech_recognition as sr
import pyttsx3
from openai import AzureOpenAI

# Azure Configuration
ENDPOINT = "######"  # Update with your actual endpoint
API_KEY = "####"  # Replace with your actual API key
API_VERSION = "2024-02-01"
MODEL_NAME = "gpt-4o"  # Update to GPT-4o model if available in your Azure instance

# Initialize the AzureOpenAI client
client = AzureOpenAI(
    azure_endpoint=ENDPOINT,
    api_key=API_KEY,
    api_version=API_VERSION,
)

# Initialize pyttsx3 (Text-to-Speech engine)
engine = pyttsx3.init()

# Initialize SpeechRecognition recognizer
recognizer = sr.Recognizer()

# Function to recognize speech from the microphone
def recognize_speech():
    with sr.Microphone() as source:
        print("Please say something...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)
        try:
            print("Recognizing speech...")
            # Using Google Web Speech API for recognition
            user_input = recognizer.recognize_google(audio)
            print(f"You said: {user_input}")
            return user_input
        except sr.UnknownValueError:
            print("Sorry, I couldn't understand that.")
            return None
        except sr.RequestError:
            print("Sorry, there was an error with the speech service.")
            return None

# Function to convert text to speech
def speak_text(text):
    print(f"Speaking: {text}")
    engine.say(text)
    engine.runAndWait()

# Function to get chatbot response from OpenAI
def get_chatbot_response(user_input):
    # Define the conversation messages with your healthcare chatbot prompt
    messages = [
        {
            "role": "system",
            "content": (
                "You are a multilingual AI-powered chatbot designed to assist patients in describing their symptoms, "
                "navigating NHS services, and overcoming language barriers. Your goal is to reduce wait times, improve triage, "
                "and ensure that patients, especially non-native speakers, receive accurate assistance in finding the appropriate "
                "healthcare services. When interacting with patients, always prioritize clarity, empathy, and understanding, "
                "especially when symptoms or services might be difficult to describe. Provide clear guidance on whether the patient "
                "should contact a GP, visit A&E, or reach out for mental health support, depending on the symptoms described. "
                "Make sure to encourage the use of appropriate healthcare services and explain the process for accessing them. "
                "Maintain professionalism, respect, and sensitivity to various cultural backgrounds. Respond in the patient's preferred "
                "language, and if there’s difficulty understanding the symptoms, ask for clarifications in a gentle manner. "
                "Do not prescribe or suggest any specific medications or dosages; instead, advise patients to consult with their GP or "
                "a qualified healthcare professional before taking any medication. Always include a disclaimer that any advice provided is "
                "informational only and that patients should seek professional medical guidance for diagnosis, treatment, or medication adjustments. "
                "Additionally, if symptoms indicate an emergency or worsening condition, advise immediate contact with emergency services. "
                "Ensure that recommendations reinforce the importance of professional medical evaluation, and do not substitute your assistance for direct clinical judgment."
            )
        },
        {"role": "user", "content": user_input}
    ]

    # Create the chat completion request
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=messages
    )

    # Access the assistant's response using dot notation.
    # Replace the previous dict-style access with:
    response_content = response.choices[0].message.content
    return response_content

# Main loop to integrate speech recognition and chatbot
if __name__ == "__main__":
    while True:
        # Step 1: Recognize speech from the user
        user_input = recognize_speech()

        if user_input:
            # Step 2: Get the chatbot response
            chatbot_response = get_chatbot_response(user_input)

            # Step 3: Speak the chatbot's response
            speak_text(chatbot_response)
