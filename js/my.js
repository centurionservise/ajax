"use strict";
$(function () {
  var get_obj,
    chapter_mass,
    chapter = 0;

  $(".menu_small").hide();
  $.ajax({
    method: "GET",
    async: false,
    url: "https://ledatest.azurewebsites.net/api/GetCourse",
    statusCode: {
      404: function () {
        alert("Not found");
      }
    },
    error: function (error) {
      console.error("Error", error);
    },
    success: function (result) {
      console.log("GET", result);
      get_obj = result;
    }
  });
  chapter_mass = get_obj.stories[0].chapter;

  for (var i = 0; i < chapter_mass.length; i++) {
    $(".tabs_zakladki").append(
      "<div class=new_tab id=tab" +
      i +
      "><div class=cont_chapter><span class=chapter_word1>Chapter</span><span class=chapter_word2>0" +
      (i + 1) +
      "</span></div></div>"
    );
  }
  $("#tab" + chapter)
    .addClass("active_tab")
    .css("color", "" + chapter_mass[chapter].color)
    .css("border-bottom-color", "" + chapter_mass[chapter].color);
  $(".tabs_sodergumoe").append(
    '<img src="' + chapter_mass[0].activities[0].imagepreviewurl + '" alt="">'
  );
  $(".play").css("background-color", "" + chapter_mass[0].color);
  $(".play").click(function () {
    $(".tabs_sodergumoe").empty();
    $(".tabs_sodergumoe").append(
      "<video controls autoplay> <source src=" +
      chapter_mass[chapter].activities[chapter].bundle.bundleurl +
      " type=" +
      chapter_mass[chapter].activities[chapter].bundle.type +
      "> </video>"
    );
  });


  //******************* Events for tabs ***********************
  $(".new_tab").each(function (index, elem) {
    $(elem).click(function () {
      if ($("#tab" + index).hasClass("active_tab") == false)
        $("#tab" + index)
        .addClass("active_tab")
        .css("color", "" + chapter_mass[index].color)
        .css("border-bottom-color", "" + chapter_mass[index].color);
      for (var i = 0; i < chapter_mass.length; i++) {
        if (index != i)
          $("#tab" + i)
          .removeClass("active_tab")
          .css("color", "#808080")
          .css("border-bottom-color", "#808080");
      }
      $(".tabs_sodergumoe").empty();
      $(".tabs_sodergumoe").append(
        '<img src="' +
        chapter_mass[index].activities[0].imagepreviewurl +
        '" alt="">'
      );

      $(".tabs_sodergumoe").append('<div class="play"></div>');
      $(".play").css({
        "background-color": "" + chapter_mass[index].color
      });

      $(".play").click(function () {
        $(".tabs_sodergumoe").empty();
        $(".tabs_sodergumoe").append(
          "<video controls autoplay> <source src=" +
          chapter_mass[index].activities[index].bundle.bundleurl +
          " type=" +
          chapter_mass[index].activities[index].bundle.type +
          "> </video>"
        );
      });
    });
  });
});