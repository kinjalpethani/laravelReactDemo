export const FormGenerate = ({forms}) => {
    const handleLoadForm = (e, formData) => {
        console(formData);
    }
    return <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
            <div className="form-group">
                <label>Select Form</label>
                <select className="form-control">
                    <option>---Select Form---</option>
                    {forms.map((option) => (
                        <option key={option.id} value={option.id}
                                onChange={(e) => handleLoadForm(e, option.form_json)}>{option.form_name}</option>
                    ))}
                </select>
            </div>
        </div>
    </div>
}