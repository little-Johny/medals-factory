<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CountryController extends Controller
{
    public function index()
    {
        $countries = Country::withCount("medals")->get();

        if ($countries->isEmpty())
            return response()->json(["message" => "There are no registered countries"], 404);

        return response()->json($countries, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                "name" => "required|string",
                "code" => "required|string|min:2|max:3"
            ]
        );

        if ($validator->fails())
            return response()->json([
                "message" => "Error in data validation",
                "errors" => $validator->errors(),
                "status" => 400,
            ], 400);

        $country = Country::create([
            "name" => $request->name,
            "code" => $request->code,
        ]);

        if (!$country)
            return response()->json(["message" => "Error to create country", "status" => 500], 500);

        return response()->json(["country" => $country, "status" => 201], 201);
    }

    public function show($id)
    {
        $country = Country::find($id);

        if (!$country)
            return response()->json(["message" => "Country not found", "status" => 404], 404);

        return response()->json(["country" => $country, "status" => 200]);
    }

    public function destroy($id)
    {
        $country = Country::find($id);

        if (!$country)
            return response()->json(["message" => "Country not found", "status" => 404], 404);

        $country->delete();

        return response()->json(["message" => "Country deleted successfully", "status" => 200]);
    }

    public function update(Request $request, $id)
    {
        $country = Country::find($id);

        if (!$country)
            return response()->json(["message" => "Country not found", "status" => 404], 404);

        $validator = Validator::make(
            $request->all(),
            [
                "name" => "sometimes|required|string",
                "code" => "sometimes|required|string|min:2|max:3"
            ]
        );

        if ($validator->fails())
            return response()->json([
                "message" => "Error in data validation",
                "errors" => $validator->errors(),
                "status" => 400,
            ], 400);

        $country->update($request->only(["name", "code"]));

        return response()->json(["message" => "Country updated successfully", "country" => $country, "status" => 200]);
    }

    public function medalsByCountry($id)
    {
        $country = Country::with("medals")->find($id);
        if (!$country) {
            return response()->json(['message' => 'Country not found'], 404);
        }

        return response()->json([
            'country' => $country->name,
            'code'=> $country->code,
            'medals' => $country->medals,
            'total'=> count($country->medals),
        ]);
    }

}
