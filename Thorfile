require 'thor'
require 'stringex'

class JK < Thor
  namespace :default

  desc "b", "Build the site"
  def b
    say "Building site..."
    system "bundle exec jekyll build"
  end

  desc "s", "Serve the Jekyll site locally"
  def s
    say "Serving Jekyll site..."
    say "Server: http://localhost:4000"
    say "livereload.js: http://localhost:35729"

    begin
      pid = Process.spawn("bundle exec jekyll serve --livereload --watch")
      File.write('jekyll.pid', pid)
      Process.wait(pid)
    rescue Interrupt
      say "\nGraceful shut down..."
      Process.kill('INT', pid)
      Process.wait(pid)
      File.delete('jekyll.pid') if File.exist?('jekyll.pid')  # Cleanup
      say "Shutdown complete."
      exit 0
    ensure
      File.delete('jekyll.pid') if File.exist?('jekyll.pid')  # Always cleanup
    end
  end

  desc "doc", "Clean build output and run Jekyll doctor"
  def doc
    say "Cleaning build output..."
    clean_success = system("bundle exec jekyll clean")

    unless clean_success
      say "Error: Jekyll clean failed!", :red
      exit 1
    end

    say "Running Jekyll doctor..."
    doctor_success = system("bundle exec jekyll doctor")

    if doctor_success
      say "Jekyll doctor completed successfully. No issues found!", :green
    else
      say "Error: Jekyll doctor found issues!", :red
      exit 1
    end
  end

  desc "new TITLE", "Create a new post with the given title"
  method_option :editor, default: "nvim"
  def new(*title)
    title = title.join(" ")
    date = Time.now.strftime("%Y-%m-%d")
    slug = title.to_url
    filename = "_posts/#{date}-#{slug}.md"

    if File.exist?(filename)
      abort("#{filename} already exists!")
    end

    say "Creating new post: #{filename}"
    File.open(filename, "w") do |post|
      post.puts "---"
      post.puts "layout: post"
      post.puts "title: \"#{title.gsub(/&/, '&amp;')}\""
      post.puts "date: #{Time.now.strftime("%Y-%m-%d %H:%M:%S %z")}"
      post.puts "tags: []"
      post.puts "---"
      post.puts "\n"
    end

    system(options[:editor], filename)
  end
end