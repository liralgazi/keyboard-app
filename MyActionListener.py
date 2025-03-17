class MyActionListener:
    def __init__(self):
        # store action listeners
        self.listeners = {}

    def register_listener(self, action, listener):      
        if action not in self.listeners:
            # If the action does not exist- Create a new list for the action
            self.listeners[action] = []  

        # If the action already exists, the new listener is added to the list.
        self.listeners[action].append(listener)  # Add the listener function

    def trigger_action(self, action, *args, **kwargs):
        if action in self.listeners:
            for listener in self.listeners[action]:
                # Call each listener function with arguments
                listener(*args, **kwargs)  
        else:
            print(f"No listeners registered for action: {action}")

    def remove_listener(self, action):
        if action in self.listeners:
             # Remove the action from the dictionary
            del self.listeners[action] 

    def emit(self, action, data):
        if action not in self.listeners:
            raise Exception(f"Action '{action}' is not registered.")

        for listener in self.listeners[action]:
            # Call each listener with the provided data
            listener(data)  
