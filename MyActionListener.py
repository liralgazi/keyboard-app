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

# Add a listener to the action "PRINT"
action_listener.register_listener("PRINT", lambda data: print(f"Don't tell me what I {data} or {data}'t do"))

# Add another listener for the action "PRINT"
action_listener.register_listener("PRINT", lambda data: print(f"I eat pickles right off the {data}"))

# Emit the "PRINT" action with the word "can"
print("\nEmitting 'PRINT' action:")
action_listener.emit("PRINT", "can")
