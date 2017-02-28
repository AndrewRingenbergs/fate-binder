require 'json'

chars = [];

genders = {
  m: 'male',
  f: 'female'
}

races = {
  dw: 'dwarf',
  el: 'elf',
  gn: 'gnome',
  ha: 'halfling',
  hu: 'human',
  or: 'orc'
}

unknown = {};

files = Dir["./*.jpg"].map {|file|
  parts = file.split '_'

  hash = {
    name: file.split('/')[1].split('.')[0].split('_').collect(&:capitalize).join,
    path: file,
    race: races[parts[1].to_sym],
    gender: genders[parts[2].to_sym]
  }

  if (parts[3] == '99')
    if(parts[2] == 'f')
      unknown = hash;
    end
  end

  hash
}

imports = files.map { |file|
  "import image#{file[:name]} from '#{file[:path]}';"
}

def objectMap(file)
  "{ img: image#{file[:name]}, race: '#{file[:race]}', gender: '#{file[:gender]}', type: 'fantasy-character' }"
end

objects = files.map {|file| objectMap(file)}.map{|line| "  #{line},"}



puts imports.join("\n")
puts "\nconst portraits = ["
puts objects.join("\n");
puts "];"

puts "export default portraits;";

puts "export const unknown = #{objectMap(unknown)};"
