<?php

namespace App\Http\Controllers;

use App\Models\FormBuild;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FormController extends Controller
{
    public function saveFormData(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'formName' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'errors' => $validator->errors()]);
        }
        $json = [
            'form' => $request->formName,
        ];
        if ($request->date) {
            $json['date'] = $request->date;
        }
        if ($request->text) {
            $json['text'] = $request->text;
        }
        if ($request->dropdown) {
            $json['dropdown'] = $request->dropdown;
        }
        if ($request->radio) {
            $json['radio'] = $request->radio;
        }
        if ($request->checkbox) {
            $json['checkbox'] = $request->checkbox;
        }
        if ($request->textarea) {
            $json['textarea'] = $request->textarea;
        }


        $model = new FormBuild();
        $model->form_name = $request->formName;
        $model->form_json = json_encode($json);
        $model->save();

        return response()->json([
            'status' => 200,
            'message' => 'Form added successfully']);
    }

    public function getFormData(Request $request)
    {
        $form = FormBuild::get();
        if ($form) {
            return response()->json([
                'status' => 200,
                'formData' => $form]);
        }
        return response()->json([
            'status' => 500,
            'message' => 'No data']);
    }
}
