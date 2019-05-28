class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.integer :player_one_id
      t.integer :player_two_id
      t.integer :winner
      t.timestamps
    end
  end
end
