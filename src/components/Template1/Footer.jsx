import React from 'react';

const Footer = ({ contacts }) => {
  return (
    <div className='mt-10 sm:p-6 p-5 bg-gray-700 flex items-center justify-center'>
      <div className='flex items-center justify-around w-full'
      style={{color:"blue"}}>
        {contacts?.github && (
          <p>
            <a
             href={contacts.github} target="_blank" rel="noopener noreferrer" >
              GitHub
            </a>
          </p>
        )}
        {contacts?.linkedIn && (
          <p>
            <a href={contacts.linkedIn} target="_blank" rel="noopener noreferrer" >
              LinkedIn
            </a>
          </p>
        )}
        {contacts?.contactNumber && <p>{contacts.contactNumber}</p>}
      </div>
    </div>
  );
};

export default Footer;
