class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    # ここ必須
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    # 送る側
    message = Message.create!( content: data['message'] )
    template = ApplicationController.renderer.render(partial: 'messages/message', locals: {message: message})
    # room.jsのRoomChannelに送る
    ActionCable.server.broadcast 'room_channel', template
  end
end
