require 'rake'
require 'rake/tasklib'

# --- Configuration ---

JEKYLL_CONFIG_FILES = ENV['JEKYLL_CONFIG'] || 'Config.toml'
JEKYLL_SOURCE_DIR   = ENV['JEKYLL_SOURCE'] || 'src'
JEKYLL_DEST_DIR     = ENV['JEKYLL_DESTINATION'] || '_site'

# --- Helper Methods ---

def jekyll_command(command, options = {})
  cmd = "bundle exec jekyll #{command} --source #{JEKYLL_SOURCE_DIR} --destination #{JEKYLL_DEST_DIR} --config #{JEKYLL_CONFIG_FILES}"
  cmd += " --verbose" if options[:verbose]
  cmd += " #{options[:extra_args]}" if options[:extra_args]
  puts "Executing: #{cmd}" if options[:verbose]
  sh cmd
end

# --- Tasks ---

namespace :jk do
  desc "Build the site"
  task :build do
    jekyll_command('build')
  end

  desc "Build the site with verbose output"
  task :build_verbose do
    jekyll_command('build', verbose: true)
  end

  desc "Build the site with a specific environment (e.g., production)"
  task :build_env, [:env] do |t, args|
    env = args[:env] || 'development'
    jekyll_command('build', extra_args: "--environment #{env}", verbose: true)
  end

  desc "Serve the site locally"
  task :serve do
    jekyll_command('serve', verbose: false, extra_args: '--livereload')
  end

  desc "Serve the site locally with a specific port"
  task :serve_port, [:port] do |t, args|
    port = args[:port] || 4000
    jekyll_command('serve', verbose: true, extra_args: "--port #{port} --livereload")
  end

  desc "Clean the _site directory"
  task :clean do
    rm_rf JEKYLL_DEST_DIR
    puts "Removed: #{JEKYLL_DEST_DIR}"
  end

  desc "Deploy the site (example - customize this!)"
  task :deploy => [:build] do
    puts "TODO: DEPLOY"
  end
end

# --- Default Task ---

desc "Default task: build"
task :default => 'jk:build'