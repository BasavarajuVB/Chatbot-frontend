
import React, { useState, useEffect } from 'react';

const Chatbot = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [showOptions, setShowOptions] = useState(true);
    const [showQueryBox, setShowQueryBox] = useState(false);

    const supportOptions = [
        { id: 1, text: 'Order Query' },
        { id: 2, text: 'Product Support' },
        { id: 3, text: 'Course Support' },
        { id: 4, text: 'Learning Support' },
        { id: 5, text: 'Write Your Own Query' }
    ];

    useEffect(() => {
        setMessages([
            { text: `Hi ${user.username}, welcome to our support 🤖 Chat Bot! 😊`, type: 'bot' },
            { text: 'Please select an option:', type: 'bot' }
        ]);
    }, [user.username]);

    const handleOptionSelect = (option) => {
        setShowOptions(false);
        if (option.id === 5) {
            setShowQueryBox(true);
            setMessages([...messages, { text: 'Please write your query below:', type: 'bot' }]);
        } else {
            const response = getResponseForOption(option.text);
            setMessages([
                ...messages, 
                { text: option.text, type: 'user' },
                { text: response, type: 'bot' },
                { text: 'Our team will call you regarding this query within the next 2 hours. Is there anything else I can help you with?', type: 'bot' }
            ]);
            setTimeout(() => setShowOptions(true), 1000);
        }
    };

    const getResponseForOption = (optionText) => {
        switch (optionText) {
            case 'Order Query':
                return "I understand you have a question about your order. Our order support team is ready to assist you with any concerns, including order status, shipping information, or modifications to your purchase. We'll connect you with a specialist who can access your order details and provide personalized assistance.";
            case 'Product Support':
                return "Thank you for reaching out about product support. Our team is equipped to help with product specifications, troubleshooting, warranty information, and usage guidelines. We'll ensure you're connected with an expert who can provide detailed assistance for any of our products.";
            case 'Course Support':
                return "We're here to help with any course-related questions or issues. Our support team can assist with course access, technical difficulties, assignment submissions, or general course navigation. We'll make sure you get the help you need to have a smooth learning experience.";
            case 'Learning Support':
                return "I'm glad you've reached out for learning support. Our dedicated team can provide guidance on study techniques, time management, accessing additional resources, and understanding complex topics. We're committed to helping you achieve your learning goals and will connect you with a learning specialist.";
            default:
                return "I apologize, but I couldn't process that option. Don't worry though, we're still here to help. A support representative will assist you shortly with any questions or concerns you may have.";
        }
     
    };

    const handleQuerySubmit = (e) => {
        e.preventDefault();
        const ticketNumber = Math.floor(Math.random() * 100000);
        setMessages([
            ...messages,
            { text: input, type: 'user' },
            { text: `Thank you for your query. Your ticket number is ${ticketNumber}. We will connect with you within 24 hours.`, type: 'bot' },
            { text: 'Is there anything else I can help you with?', type: 'bot' }
        ]);
        setShowQueryBox(false);
        setInput('');
        setTimeout(() => setShowOptions(true), 1000);
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.type}`}>
                        {msg.text}
                    </div>
                ))}
                {showOptions && (
                    <div className="options">
                        {supportOptions.map(option => (
                            <button key={option.id} onClick={() => handleOptionSelect(option)}>
                                {option.text}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {showQueryBox && (
                <form onSubmit={handleQuerySubmit} className="query-form">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your query..."
                    ></textarea>
                    <div className="form-buttons">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => {
                            setShowQueryBox(false);
                            setShowOptions(true);
                        }}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Chatbot;