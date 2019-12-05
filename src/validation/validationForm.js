export const formState = {
    formValidate: {
        name: {
            text: '',
            error: ''
        },
        address: {
            text: '',
            error: ''
        },
        phone: {
            text: '',
            error: ''
        },
        email: {
            text: '',
            error: ''
        },
    },
    submitError: '',
}

export const fieldValidation = (e, fieldRegex, fieldError) => {
    const fieldText = e.target.value;
    if (fieldText.match(fieldRegex)) {
        const newData = {
            text: fieldText,
            error: ''
        }
        return newData
    } else {
        if (fieldText.length === 0) {
            const newData = {
                text: '',
                error: ''
            }
            return newData
        }
        const newData = {
            text: fieldText,
            error: fieldError
        }
        return newData
    }
}