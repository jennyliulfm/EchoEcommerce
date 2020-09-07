import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  public searchWords: string = "";

  public searchResults: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
  }


  /**searchProduct */
  searchProduct(words: string) {
    //console.log(words);
  }

  /**
   * get most pupular search keywords
   *
   */
  getSearchKeyWords(words: string) {
    this.searchResults = [
      "Mask",
      "Liquids",
      "medicine"
    ];

    /**Todo */
    // Get most searched words from the backend and show it on the front.
  }
}
