<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('newses', function (Blueprint $table) {
            $table->bigIncrements('news_id');
            $table->string('title');
            $table->unsignedBigInteger('authors_id');
            $table->foreign('authors_id')->references('authors_id')->on('authors')->onDelete('cascade');
            $table->string('image_url');
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('newses');
    }
};
