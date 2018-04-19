import AxiosResponseHandler from "./AxiosResponseHandler";

class Form {
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     */
    constructor(data) {
        this.originalData = data;

        for (let field in data) {
            this[field] = data[field];
        }

        this.handler = new AxiosResponseHandler();
        this.resetOnSuccess = false;
        this.alertOnResponse = true;
        this.errorMods = 0;
        this.busy = false;
    }

    /**
     * Fetch all relevant data for the form.
     */
    data() {
        let data = {};

        for (let property in this.originalData) {
            data[property] = this[property];
        }

        return data;
    }

    /**
     * Check if the form, or form field, was modified (is dirty)
     *
     * @param field
     * @returns {boolean}
     */
    wasModified(field=null) {
        if (field) return (this[field] !== this.originalData[field]);
        for (let property in this.originalData) {
            if (this[property] !== this.originalData[property]) return true;
        }
        return false;
    }
    isDirty(field=null) {
        return this.wasModified(field);
    }

    /**
     * Reset the form fields.
     */
    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }

        this.clearError();
    }


    /**
     * Send a POST request to the given URL.
     * .
     * @param {string} url
     */
    post(url) {
        return this.submit('post', url);
    }


    /**
     * Send a PUT request to the given URL.
     * .
     * @param {string} url
     */
    put(url) {
        return this.submit('put', url);
    }


    /**
     * Send a PATCH request to the given URL.
     * .
     * @param {string} url
     */
    patch(url) {
        return this.submit('patch', url);
    }


    /**
     * Send a DELETE request to the given URL.
     * .
     * @param {string} url
     */
    delete(url) {
        return this.submit('delete', url);
    }


    /**
     * Submit the form.
     *
     * @param {string} method
     * @param {string} url
     */
    submit(method, url) {
        let Form = this;
        this.busy = true;
        return new Promise((resolve, reject) => {
            axios[method](url, this.data())
                .then(response => {
                    // console.log('Axios success');
                    this.busy = false;
                    this.handler = new AxiosResponseHandler();
                    this.handler.handleResponse(response, this.alertOnResponse);
                    if (this.resetOnSuccess) this.reset();
                    resolve(response);
                })
                .catch(error => {
                    console.log('Axios error');
                    this.busy = false;
                    this.handler = new AxiosResponseHandler();
                    this.handler.handleError(error, this.alertFromResponse);
                    reject(error);
                });
        });
    }

    /**
     * Check if an error exists for the field, or all fields if field is null
     *
     * @param field
     * @returns {*}
     */
    hasError(field = null) {
        if (this.handler) {
            return this.handler.hasFormError(field);
        }
        return false;
    }

    /**
     * Get the error message for the field, or the first available field if field is null
     *
     * @param field
     * @returns {*}
     */
    getError(field = null) {
        if (this.handler) {
            return this.handler.getFormError(field);
        }
        return null;
    }

    /**
     * Clear out errors for the field, or all fields if field is null
     *
     * @param field
     * @returns {*}
     */
    clearError(field = null) {
        if (this.handler) {
            this.handler.clearFormError(field);
            this.errorMods++;
        }
    }

    /**
     * Add an error to the field
     *
     * @param field
     * @param message
     * @returns {*}
     */
    addError(field, message) {
        if (this.handler) {
            this.handler.addFormError(field, message);
            this.errorMods++;
        }
    }
}

export default Form;
