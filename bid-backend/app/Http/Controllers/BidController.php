<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BidController extends Controller
{
    public function bid(Request $request, $id)
    {
        $amount = $request->get("amount");
        $item = Item::findOrFail($id);
        if($amount <= $item->start_price )
            return response()->json([
                "message"=>"Amount must be higher than the price",
                "start_price"=>$item->start_price
            ], 400);
        if($amount <= $item->last_price )
            return response()->json([
                "message"=>"Amount must be higher than last bid",
                "last_bid"=>$item->last_price
            ], 400);
        $user = Auth::guard()->user();
        $last_bid = Bid::query()
            ->where('item_id', $id)
            ->latest()
            ->first()
        ;
        if($last_bid->user_id == $user->id )
            return response()->json([
                "message"=>"You already placed the highest bid"
            ], 400);
        $article = Bid::create([
            "user_id"=>$user->id,
            "item_id"=>$item->id,
            "amount"=>$amount,
        ]);
        $item->last_price = $amount;
        $item->save();
        return response()->json($article);
    }
    public function history(Request $request, $id)
    {
        $query = Bid::query()
            ->select('bids.*', 'users.name AS user_name')
            ->join('users', 'users.id', '=', 'bids.user_id')
            ->where('item_id', $id)
            ->orderBy('id', "DESC");
        return $query->paginate(10);
    }
}
