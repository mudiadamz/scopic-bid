<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{

    public function index(Request $request)
    {
        $query = Item::query();
        if ( $request->has("search") ) {
            $value = $request->input("search");
            $query
                ->where('name', 'like', '%'.$value.'%')
                ->orWhere('description', 'like', '%'.$value.'%')
                ;
        }
        if($request->has('direction')){
            //Handle default parameter of get with second argument
            $query->orderBy('last_price', $request->get('direction', 'ASC'));
        }
        return $query->paginate(10);
    }

    public function show($id)
    {
        return Item::find($id);
    }

    public function store(Request $request)
    {
        $article = Item::create($request->all());

        return response()->json($article, 201);
    }

    public function update(Request $request, Item $article)
    {
        $article->update($request->all());

        return response()->json($article, 200);
    }

    public function delete(Item $article)
    {
        $article->delete();

        return response()->json(null, 204);
    }
}
