interface Window {
    Email: {
        send: (emailData: {
            Host: string;
            Username: string;
            Password: string;
            To: string;
            From: string;
            Subject: string;
            Body: string;
        }) => Promise<string>;
    };
}