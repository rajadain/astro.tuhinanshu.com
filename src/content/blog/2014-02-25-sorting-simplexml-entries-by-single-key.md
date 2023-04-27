---
title: Sorting SimpleXML Entries by Single Key
postSlug: sorting-simplexml-entries-by-single-key
date_published: 2014-02-25T17:33:58.000Z
date_updated: 2014-03-08T00:54:16.000Z
tags:
  - programming
---

Given the following XML that has been loaded into a SimpleXML object in PHP:

    <person>
      <name>Angela</name>
      <address>
        <street>123 Arbor St</street>
        <city>Ann Arbor</city>
      </address>
    </person>
    <person>
      <name>Becky</name>
      <address>
        <street>234 Buckingham Ave</street>
        <city>Boston</city>
      </address>
    </person>
    <person>
      <name>Charlie</name>
      <address>
        <street>345 Cherry Ln</street>
        <city>Charlotte</city>
      </address>
    </person>

To sort by `name`, do the following:

    $xml = simplexml_load_file($xmlfile);
    
    $data = array();
    
    foreach ($xml as $x) {
      $data[(string) $x->name] = $x;
    }
    
    ksort($data);

To sort by `city`, do the following:

    $xml = simplexml_load_file($xmlfile);
    
    $data = array();
    
    foreach ($xml as $x) {
      $data[(string) $x->address->city] = $x;
    }
    
    ksort($data);

This is a simple technique that works when you have a single key by which you wish to sort the XML. We create the `$data` array and associate the key (`name` in the former case, `city` in the latter) with the actual element, and let [ksort](http://php.net/ksort) take care of the rest. ksort sorts an array by the key while maintaining the association.

### Motivation

The reason for this post is that while Googling I kept finding more complex solutions which included [usort with a custom compare function](http://stackoverflow.com/questions/8285029/sort-simplexml-array), or [array_multisort which was even more complex](http://stackoverflow.com/questions/8353129/php-simplexml-array-multisort-kind-of-works), or [using a third party implementation](http://stackoverflow.com/questions/2119686/sorting-an-array-of-simplexml-objects) like [SimpleDOM](https://code.google.com/p/simpledom/). This was much simpler and quicker, and I wanted to record this for future use.
