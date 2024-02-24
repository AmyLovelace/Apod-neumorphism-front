import React from 'react'
import '../atoms/title.component.scss'


const Title = () => {
    return (
        <div className="title-container">
          <h1 className="title">Visions of the Cosmos</h1>
          <p className="subtitle">Submit a date and you will have access to NASA's Picture of the Day.</p>
        </div>
      );
}

export default Title
