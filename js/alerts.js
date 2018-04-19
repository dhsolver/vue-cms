window.alerts = new Vue({
    el: '#alerts',

    data() {
        return {
            'count': 0,
            'messages': [],
            'flashKey': 'flashed_messages'
        }
    },

    mounted() {
        this.initMessagesFromStorage();
    },

    methods: {
        /**
         * Add a message immediately
         *
         * @param type
         * @param message
         */
        addMessage(type, message) {
            this.messages.unshift({
                'id': ++this.count,
                'type': type,
                'message': message
            });
        },

        /**
         * Add a message for the next page load (useful for redirects)
         *
         * @param type
         * @param message
         */
        flashMessage(type, message) {
            let messages = this.getLocalMessages();
            messages.push({
                'type': type,
                'message': message,
            });
            let string = JSON.stringify(messages);
            localStorage.setItem(this.flashKey, string);
        },

        getLocalMessages() {
            let messages = [];
            let local = localStorage.getItem(this.flashKey);
            if (local && local !== 'null') {
                messages = JSON.parse(local);
            }
            return messages;
        },

        initMessagesFromStorage() {
            let messages = this.getLocalMessages();
            for (let item of messages) {
                console.log(item);
                this.addMessage(item.type, item.message);
            }
            localStorage.removeItem(this.flashKey);
        }
    }
});
