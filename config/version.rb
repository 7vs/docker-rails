module DockerRails
  class Application
    def version
      '2.0.0-alpha'
    end

    def build_time
      @build_time ||= begin
        File.read('BUILD_TIME').lines.first.chomp.to_datetime
      rescue Errno::ENOENT
        Time.current
      end
    end
  end
end
