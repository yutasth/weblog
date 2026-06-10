# frozen_string_literal: true

module Jekyll
  class DayPage < Page
    def initialize(site, day)
      @site = site
      @base = site.source
      @dir = day
      @name = "index.html"

      process(@name)
      @content = ""
      @data = {
        "layout" => "day",
        "title" => "#{day[0, 4]}.#{day[4, 2]}.#{day[6, 2]}",
        "day" => day,
        "permalink" => "/#{day}/"
      }
    end
  end

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

  class ArchivePagesGenerator < Generator
    safe true
    priority :low

    def generate(site)
      diary = site.collections.fetch("diary").docs
      days = diary.filter_map do |entry|
        entry.basename_without_ext[/\A\d{8}/]
      end.uniq
      months = diary.filter_map do |entry|
        entry.basename_without_ext[/\A\d{6}/]
      end.uniq

      days.each do |day|
        site.pages << DayPage.new(site, day)
      end

      months.each do |month|
        site.pages << MonthPage.new(site, month)
      end
    end
  end
end
