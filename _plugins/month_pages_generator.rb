# frozen_string_literal: true

module Jekyll
  class MonthPage < Page
    def initialize(site, month)
      @site = site
      @base = site.source
      @dir = month
      @name = "index.html"

      process(@name)
      @content = ""
      @data = {
        "layout" => "month",
        "title" => "#{month[0, 4]}.#{month[4, 2]}",
        "month" => month,
        "permalink" => "/#{month}/"
      }
    end
  end

  class MonthPagesGenerator < Generator
    safe true
    priority :low

    def generate(site)
      diary = site.collections.fetch("diary").docs
      months = diary.filter_map do |entry|
        entry.basename_without_ext[/\A\d{6}/]
      end.uniq

      months.each do |month|
        site.pages << MonthPage.new(site, month)
      end
    end
  end
end
