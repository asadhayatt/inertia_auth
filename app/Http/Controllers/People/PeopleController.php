<?php

namespace App\Http\Controllers\People;

use App\Http\Controllers\Controller;
use App\Models\People;
use Illuminate\Http\Request;

class PeopleController extends Controller
{
    public function getPeopleRecord(Request $request){

        $result = People::get();

        // foreach($result as $item){
        //     $interestsArray = json_decode($result, true); // Decode to array
    
        //     // Convert to comma-separated string
        //     $item->interests = implode(', ', $interestsArray); // Join with a comma
        // }

        if($result){
            return response()->json([
                'status'    =>  '200',
                'message' => 'People record fetched successfully',
                'record' => $result
                ]);
        }else{
            return response()->json([
                'status'    =>  '500',
                'message' => 'People record not found !',
                ]);
        }

    }
    
    public function storePeopleRecord(Request $request){

        // $request = [
        //     "name"=> "John",
        //     "surname"=> "Doe",
        //     "id_number"=> "1234567890123",
        //     "mobile"=> "+27 72 123 4567",
        //     "email"=> "john.doe@example.com",
        //     "birth_date"=> "1990-01-15",
        //     "language"=> "English",
        //     "interests"=> "Reading"
        // ];
        // $interests = ['cat', 'dog', 'driving'];
        // $interests = json_encode($interests); // Store as JSON

        $record = People::create($request);
        if($record){
            return response()->json([
                'status'    =>  '200',
                'message' => 'People record created successfully',
                'record' => $record
                ]);
        }else{
            return response()->json([
                'status'    =>  '500',
                'message' => 'Record not create !'
                ]);
        }

    }


    public function deletePeopleRecord($id){

        $deleteRecord = People::find($id)->delete();

        if($deleteRecord){
            return response()->json([
                'status'    =>  '200',
                'message' => 'People record deleted successfully'
                ]);
        }else{
            return response()->json([
                'status'    =>  '404',
                'message' => 'People record not found !',
                ]);
        }

    }
    public function updatePeopleRecord(Request $request){

        $updateRecord = People::find($request->id);
        $updateRecord->name = $request->name;
        $updateRecord->surname = $request->surname;
        $updateRecord->id_number = $request->idNumber;
        $updateRecord->mobile = $request->mobile;
        $updateRecord->email = $request->email;
        $updateRecord->birth_date = $request->birthDate;
        $updateRecord->language = $request->language;
        $updateRecord->interests = $request->interests; // Store array as JSON
        $updateRecord->update();


        if($updateRecord){
            return response()->json([
                'status'    =>  '200',
                'message' => 'People record updated successfully'
                ]);
        }else{
            return response()->json([
                'status'    =>  '404',
                'message' => 'People record not found !',
                ]);
        }

    }

}
