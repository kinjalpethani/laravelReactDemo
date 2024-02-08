import React, {useEffect, useState} from "react";
import Helper from "../util/Helper";
import {useNavigate} from "react-router-dom";
import {FormGenerate} from "./FormGenerate";

export const FormBuild = () => {
    const [formData, setFormData] = useState({});
    const [errors, setError] = useState({});
    const [canvasComponents, setCanvasComponents] = useState([]);
    const {http} = Helper();
    const navigate = useNavigate();
    const [saveForm, setSaveFormData] = useState({});

    useEffect(() => {
        http.get('formData').then(res => {
            if (res.data.status === 200) {
                setSaveFormData(res.data.formData);
            }
        });
    }, [])
    const availableFormComponents = [
        'Date',
        'Text',
        'Dropdown',
        'Radio',
        'Checkbox',
        'Textarea',
    ];

    const handleDragStart = (e, component) => {
        e.dataTransfer.setData('formComponent', component);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const component = e.dataTransfer.getData('formComponent');
        setCanvasComponents([...canvasComponents, {type: component, label: ''}]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleLabelChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSaveForm = (e) => {
        e.preventDefault();
        http.post('save-form-data', formData)
            .then(res => {
                if (res.data.status === 500) {
                    setError(res.data.errors);
                }
                if (res.data.status === 200) {
                    setFormData({});
                    setError({});
                    navigate('/');
                }
            });
    };

    return <div>
        {saveForm.length > 0 && <FormGenerate forms={saveForm}/>}
        <div className="py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Form components</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSaveForm}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Form Name</label>
                                                <input type="text" className="form-control" name="formName"
                                                       value={formData.formName || ''}
                                                       onChange={handleLabelChange}
                                                       placeholder="Form Name"/>
                                                {errors && errors.hasOwnProperty('formName') &&
                                                    <div className="invalid-feedback">{errors['formName']}</div>}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label>Input Elements (Drag and Drop)</label>
                                                    <hr/>
                                                    {availableFormComponents.map((component) => (
                                                        <div
                                                            key={component}
                                                            draggable
                                                            onDragStart={(e) => handleDragStart(e, component)}>
                                                            {component}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <h4 className="fw-bold">Drop Your elements here</h4>
                                                    <hr/>
                                                </div>
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
                                                        <div key={index} className="col-md-6">
                                                            <div className="form-group mb-3 p-2">
                                                                <div>
                                                                    {canvasComponent.type}{' '}
                                                                    {canvasComponent.type === 'Date' && (
                                                                        <div className="col-md-10">
                                                                            <input className="form-control"
                                                                                   type="text"
                                                                                   name="date"
                                                                                   placeholder="Label for date input"
                                                                                   value={formData.date || ''}
                                                                                   onChange={handleLabelChange}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    {canvasComponent.type === 'Text' && (
                                                                        <div className="col-md-10">
                                                                            <input className="form-control"
                                                                                   type="text"
                                                                                   name="text"
                                                                                   placeholder="Label for text input"
                                                                                   value={formData.text || ''}
                                                                                   onChange={handleLabelChange}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    {canvasComponent.type === 'Dropdown' && (
                                                                        <div className="col-md-10">
                                                                            <input className="form-control"
                                                                                   type="text"
                                                                                   name="dropdown"
                                                                                   placeholder="Label for dropdown input"
                                                                                   value={formData.dropdown || ''}
                                                                                   onChange={handleLabelChange}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    {canvasComponent.type === 'Radio' && (
                                                                        <div className="col-md-10">
                                                                            <input className="form-control"
                                                                                   type="text"
                                                                                   name="radio"
                                                                                   placeholder="Label for radio input"
                                                                                   value={formData.radio || ''}
                                                                                   onChange={handleLabelChange}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    {canvasComponent.type === 'Checkbox' && (
                                                                        <div className="col-md-10">
                                                                            <input className="form-control"
                                                                                   type="text"
                                                                                   name="checkbox"
                                                                                   placeholder="Label for checkbox input"
                                                                                   value={formData.checkbox || ''}
                                                                                   onChange={handleLabelChange}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    {canvasComponent.type === 'Textarea' && (
                                                                        /*<textarea name="textarea"
                                                                                  placeholder="Label for textarea"></textarea>*/
                                                                        <input className="form-control"
                                                                               type="text"
                                                                               name="textarea"
                                                                               placeholder="Label for textarea input"
                                                                               value={formData.textarea || ''}
                                                                               onChange={handleLabelChange}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-2">
                                                <div className="form-group text-center">
                                                    <button type="submit"
                                                            className="btn btn-primary">Save Form
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}