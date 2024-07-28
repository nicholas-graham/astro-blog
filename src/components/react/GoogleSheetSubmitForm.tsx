import React, { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: ''
    });

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('email', formData.email);
        data.append('phoneNumber', formData.phoneNumber);
        // your URL.

        const Sheet_Url = "https://script.google.com/macros/s/AKfycbyQ0QFVAtbQPZ3OznHmltGm0r_g1c8T2NbtzB3zBVHpJluSFRczNPRhoGamRHXIKe7Y9w/exec"
        try {
            await fetch(Sheet_Url, {
                method: 'POST',
                body: data,
            });

            setFormData({
                fullName: '',
                email: '',
                phoneNumber: '',
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullName">Full Name:</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </header>
        </div>
    );
}

export default Contact