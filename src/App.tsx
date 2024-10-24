import React, { useState } from 'react';
import emailjs from 'emailjs-com';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Отправка письма через EmailJS
    // @ts-ignore
    emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
        {
          name: formData.name,     // Используем данные из formData
          email: formData.email,
          message: formData.message
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY || ''
    )
        .then((result) => {
          alert('Сообщение успешно отправлено!');
        })
        .catch((error) => {
          console.error('Ошибка отправки письма:', error);
        });
  };

  return (
      <div className="App">
        <h1>Форма обратной связи</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Ваше имя:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
          </div>
          <div>
            <label htmlFor="email">Ваш email:</label>
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
            <label htmlFor="message">Ваше сообщение:</label>
            <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
            ></textarea>
          </div>
          <button type="submit">Отправить</button>
        </form>
      </div>
  );
};

export default App;
