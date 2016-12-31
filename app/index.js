function heading() {
  var menu = document.createElement('div');
  menu.className += 'pure-menu pure-menu-horizontal home-menu'

  var heading = document.createElement('a');
  heading.className += 'pure-menu-heading'
  heading.innerHTML = _.join(['Roll', 'for', 'Initiative'], '\n');

  menu.appendChild(heading);

  return menu;
}

document.body.appendChild(heading());
