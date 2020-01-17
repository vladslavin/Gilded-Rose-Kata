import { Shop } from '../model/shop';
import { Item } from '../model/item';
import { genericProduct } from '../model/catalog';

describe("Gilded rose shop", function () {
    
    it("empty store functions", function () {
        const gildedRose = new Shop();
        const items = gildedRose.updateQuality();
        expect(items.length).toEqual(0);
    });

    it("system updates items sellIn and quality values next day by a single unit", function() {
        // - At the end of each day our system lowers both values for every item
        const item = new Item(genericProduct, 4, 4);
        const gildedRose = new Shop([item]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toEqual(3);
    });

    it("quality degrades twice as fast for passed products", function() {
        // - Once the sell by date has passed, Quality degrades twice as fast
        const item = new Item(genericProduct, 0, 4);
        const gildedRose = new Shop([item]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toEqual(2);
    });

    it("item quality cannot be negative ", function() {
        // The Quality of an item is never negative
        const item = new Item(genericProduct, 1, 0);
        const gildedRose = new Shop([item]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toEqual(0);
    });

    
});
