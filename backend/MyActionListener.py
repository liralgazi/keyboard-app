import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import JSONResponse

app = FastAPI()

# Enable CORS (Allow frontend to talk to backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


class MyActionListener:
    def __init__(self):
        # store action listeners
        self.listeners = {}

    def register_listener(self, action, listener):      
        if action not in self.listeners:
            # If the action does not exist- Create a new list for the action
            self.listeners[action] = []  
        # If the action already exists, the new listener is added to the list.
        self.listeners[action].append(listener)  

    def remove_listener(self, action):
        if action in self.listeners:
             # Remove the action from the dictionary
            del self.listeners[action] 

    def emit(self, action, data):
        # If the action is not registered, it raises an exception.
        if action not in self.listeners:
            raise Exception(f"Action '{action}' is not registered.")

        for listener in self.listeners[action]:
            # Call each listener function with the provided data
            listener(data)  

# Create an instance
action_listener = MyActionListener()

# JSON model for requests - validates it 
class EventRequest(BaseModel):
    action: str
    data: str

# Define a function that checks if the word exists in a dictionary API
def check_word_in_dictionary(word):
    try:
        # debug log
        print(f"Checking word: {word}") 
        # using API to check if the given word exists in the English Dictionary 
        response = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}")
        return response.status_code == 200
    except Exception as e:        
        print(f"ERROR in check_word_in_dictionary: {e}")
        return False

# Register a listener for "CHECK_WORD" that verifies the word
def validate_word_listener(word):
    is_valid = check_word_in_dictionary(word)
    # debug
    print(f"Word '{word}' is {'valid' if is_valid else 'invalid'}.")  
    return is_valid 

# Register the listener
action_listener.register_listener("CHECK_WORD", validate_word_listener)
'''
# Register API to emit events
@app.post("/emit")
async def emit_event(event: EventRequest):
    try:
        # Run all the functions registered to the action with the given data
        action_listener.emit(event.action, event.data)
        # check if the worfd is valid 
        is_valid = check_word_in_dictionary(event.data)
        return JSONResponse(content={"valid": is_valid})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)
'''

@app.post("/emit")
async def emit_event(event: EventRequest):
    try:
        # Log the API request
        print(f"Received Request: action={event.action}, data={event.data}")  

        # cheking word validation using the dictionary API
        is_valid = check_word_in_dictionary(event.data)
        print(f"Word Check Result: {is_valid}")  

        # Return the result as a JSON response with CORS headers
        return JSONResponse(content={"valid": is_valid})

    except Exception as e:
        # Log the error
        print(f"ERROR: {e}")  
        return JSONResponse(content={"error": str(e)}, status_code=500)

'''
# Call the constructor
action_listener = MyActionListener()

# Add listener to the action "PRINT"
action_listener.register_listener("PRINT", lambda data: print(f"Don't tell me what I {data} or {data}'t do"))

# Add another listener for the action "PRINT"
action_listener.register_listener("PRINT", lambda data: print(f"I eat pickles right off the {data}"))

# Execute all listeners with the data provided
print("\nEmitting 'PRINT' action:")
action_listener.emit("PRINT", "Can")

# Remove all listeners assigned to the action
print("\nRemoving 'PRINT' action listeners...")
action_listener.remove_listener("PRINT")

# Execute an unregistered action should result in an error
print("\nTrying to emit 'PRINT' action again:")
try:
    action_listener.emit("PRINT", "Can")
except Exception as e:
    print(f"Error: {e}") 
'''