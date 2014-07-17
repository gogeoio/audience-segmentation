App.Panel = DS.Model.extend({
  title: DS.attr('string'),
  min: DS.attr('number'),
  max: DS.attr('number'),
  options: DS.attr(),
  range: DS.attr(),
  attribute: DS.attr()
});

App.Panel.FIXTURES = [
 {
   id: 1,
   title: 'Population',
   attribute: 'population',
   min: 1175,
   max: 9818605
 },
 {
   id: 2,
   title: 'Ethnicities',
   attribute: 'population',
   min: 0,
   max: 4936599,
   options: ["white", "black", "hawaiian", "asian", "indian", "other race"]
 },
 {
   id: 3,
   title: 'Men',
   attribute: 'male',
   min: 606,
   max: 4839654
 },
 {
   id: 4,
   title: 'Women',
   attribute: 'female',
   min: 569,
   max: 4978951
 },
 {
   id: 5,
   title: 'Median Age',
   attribute: 'median_age',
   min: 29,
   max: 52
 }
];