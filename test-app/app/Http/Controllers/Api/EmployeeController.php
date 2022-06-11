<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeStoreRequest;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    # Метод получения информации обо всех сотрудниках
    public function index()
    {
        return EmployeeResource::collection(Employee::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return EmployeeResource
     */
    # Метод записи данных
    public function store(EmployeeStoreRequest $request)
    {
        $data = $request->all();

        if ($request -> hasFile('photo')) {
            $folder = date('Y-m-d');
            $data['photo'] = $request->file('photo')->store("images/{$folder}");
        }
        $created_employee = Employee::create($data);
        return new EmployeeResource($created_employee);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return EmployeeResource
     */
    # Метод получения информации об одном сотруднике
    public function show($id)
    {
        return new EmployeeResource(Employee::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
