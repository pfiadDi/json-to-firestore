module.exports = {
    returnStatus: (status, content) => {
        switch (status) {
            case "success":
                return { "status": "SUCCESS", "content": content };
                break;

            case "error":
                return { "status": "ERROR", "content": JSON.stringify(content) };
                break;

            default:
                return;
        }
    }
}