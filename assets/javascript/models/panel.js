App.Panel = DS.Model.extend({
  title: DS.attr('string'),
  min: DS.attr('number'),
  max: DS.attr('number'),
  options: DS.attr()
});

App.Panel.FIXTURES = [
 {
   id: 1,
   title: 'Population',
   min: 0,
   max: 100000000
 },
 {
   id: 2,
   title: 'Ethnicities',
   min: 0,
   max: 100000000,
   options: ["white", "black", "other", "asian", "indian"]
 },
 {
   id: 3,
   title: 'Men',
   min: 0,
   max: 50000000
 },
 {
   id: 4,
   title: 'Women',
   min: 0,
   max: 50000000
 }
];