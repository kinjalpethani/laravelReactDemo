import React, { useState } from 'react';

const FormBuilder = () => {
    const [formComponents, setFormComponents] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [formName, setFormName] = useState('');
    const [canvasComponents, setCanvasComponents] = useState([]);

    const availableFormComponents = [
        'date input',
        'text input',
        'select dropdown',
        'radio button',
        'checkbox group',
        'textarea',
        'paragraph or label',
    ];

    const handleDragStart = (e, component) => {
        e.dataTransfer.setData('formComponent', component);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const component = e.dataTransfer.getData('formComponent');
        setCanvasComponents([...canvasComponents, { type: component, label: '' }]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleLabelChange = (index, label) => {
        const updatedCanvasComponents = [...canvasComponents];
        updatedCanvasComponents[index].label = label;
        setCanvasComponents(updatedCanvasComponents);
    };

    const handleSaveForm = () => {
        const formData = {
            formName,
            components: canvasComponents,
        };
        setFormComponents([...formComponents, formData]);
        setFormName('');
        setCanvasComponents([]);
    };

    const handleSelectForm = (form) => {
        setSelectedForm(form);
        setCanvasComponents(form.components);
    };

    return (
        <div>
            <div>
                <h2>Form Builder</h2>
                <div>
                    <label>Form Name:</label>
                    <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} />
                </div>
                <div>
                    {availableFormComponents.map((component) => (
                        <div
                            key={component}
                            draggable
                            onDragStart={(e) => handleDragStart(e, component)}
                        >
                            {component}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    style={{
                        border: '1px solid #ccc',
                        minHeight: '300px',
                        marginTop: '20px',
                    }}
                >
                    {canvasComponents.map((canvasComponent, index) => (
                        <div key={index}>
                            {canvasComponent.type}{' '}
                            <input
                                type="text"
                                placeholder="Label"
                                value={canvasComponent.label}
                                onChange={(e) => handleLabelChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={handleSaveForm}>Save Form</button>
            </div>
            <div>
                <h2>Saved Forms</h2>
                <select onChange={(e) => handleSelectForm(JSON.parse(e.target.value))}>
                    <option value="">Select a Form</option>
                    {formComponents.map((form, index) => (
                        <option key={index} value={JSON.stringify(form)}>
                            {form.formName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FormBuilder;