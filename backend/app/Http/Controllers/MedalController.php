<?php

namespace App\Http\Controllers;

use App\Models\Medal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MedalController extends Controller
{
    public function index()
    {
        $medals = Medal::with("country")->get();

        if ($medals->isEmpty()) {
            return response()->json(["message" => "There are no registered medals"], 404);
        }

        return response()->json(["data" => $medals], 200);
    }
    public function availableMedals()
    {
        $medals = Medal::with('country')->whereNull("country_id")->get();

        if ($medals->isEmpty()) {
            return response()->json([
                "message" => "There are no available medals",
                "data" => []
            ], 200);
        }

        return response()->json(["data" => $medals], 200);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "type" => "required|in:gold,silver,bronze",
            "event" => "required|string|max:255",
            "year" => "required|digits:4|integer|min:1900|max:" . date("Y"),
            "country_id" => "nullable|exists:country,id",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => "Error in data validation",
                "errors" => $validator->errors(),
                "status" => 400
            ], 400);
        }

        $medal = Medal::create([
            "type" => $request->type,
            "event" => $request->event,
            "year" => $request->year,
            "country_id" => $request->country_id
        ]);

        return response()->json(["medal" => $medal, "status" => 201], 201);
    }

    public function show($id)
    {
        $medal = Medal::with("country")->find($id);

        if (!$medal) {
            return response()->json(["message" => "Medal not found", "status" => 404], 404);
        }

        return response()->json(["medal" => $medal, "status" => 200], 200);
    }

    public function update(Request $request, $id)
    {
        $medal = Medal::find($id);

        if (!$medal) {
            return response()->json(["message" => "Medal not found", "status" => 404], 404);
        }

        $validator = Validator::make($request->all(), [
            "type" => "in:gold,silver,bronze",
            "event" => "string|max:255",
            "year" => "digits:4|integer|min:1900|max:" . date("Y"),
            "country_id" => "nullable|exists:country,id",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => "Error in data validation",
                "errors" => $validator->errors(),
                "status" => 400
            ], 400);
        }

        $medal->update($request->only(['type', 'event', 'year', 'country_id']));

        return response()->json(["message" => "Medal updated", "medal" => $medal, "status" => 200], 200);
    }

    public function destroy($id)
    {
        $medal = Medal::find($id);

        if (!$medal) {
            return response()->json(["message" => "Medal not found", "status" => 404], 404);
        }

        $medal->delete();

        return response()->json(["message" => "Medal deleted successfully", "status" => 200]);
    }

    public function assignCountry(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            "country_id" => "required|exists:country,id"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid country ID',
                'errors' => $validator->errors()
            ], 400);
        }

        $medal = Medal::find($id);
        if (!$medal) {
            return response()->json([
                "message" => "Medal not found",
                "status" => 404
            ], 404);
        }

        $medal->country_id = $request->country_id;
        $medal->save();

        return response()->json([
            'message' => 'Country assigned successfully',
            'medal' => $medal
        ], 200);
    }


    public function getByCountry($country_id)
    {
        $medals = Medal::where("country_id", $country_id)->get();
        if ($medals->isEmpty())
            return response()->json(["message" => "No medals found for this country", "status" => 404], 404);

        return response()->json([$medals], 201);
    }
}
