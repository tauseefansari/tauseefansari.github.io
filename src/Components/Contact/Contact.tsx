import { FC } from 'react';
import 'Components/Contact/Contact.css';
import { Contact as ContactProps } from 'modals/configuration';
import DynamicIcon from 'Common/DynamicIcon';

type Props = {
  contactObj: ContactProps;
};

const Contact: FC<Props> = (props) => {
  const { id, header, title, contactCards, mailSubject, emailKey, contactForm, submitBtn } =
    props.contactObj;

  return (
    <section id={id}>
      <h5>{header}</h5>
      <h2>{title}</h2>
      <div className="container contact__container">
        <div className="contact__options">
          {contactCards.map((contactCard, i) => (
            <article className="contact__option" key={`Contact_${i}`}>
              <DynamicIcon iconName={contactCard.iconName} />
              <h4>{contactCard.title}</h4>
              <h5>{contactCard.description}</h5>
              <a href={contactCard.link.url} rel="noreferrer" target="_blank">
                {contactCard.link.title}
              </a>
            </article>
          ))}
        </div>
        <form data-bss-recipient={emailKey || ''} data-bss-subject={mailSubject || 'Contact Me'}>
          {contactForm.map((contactFormItem, i) =>
            contactFormItem.type === 'textarea' ? (
              <textarea
                key={`ContactForm_${i}`}
                name="message"
                rows={7}
                placeholder={contactFormItem.placeholder}
              ></textarea>
            ) : (
              <input
                key={`ContactForm_${i}`}
                type="text"
                name="name"
                placeholder={contactFormItem.placeholder}
                required
              />
            )
          )}
          <button type="submit" className="btn btn-primary">
            {submitBtn}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
