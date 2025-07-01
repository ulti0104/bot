import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export const data = new SlashCommandBuilder()
  .setName('weather')
  .setDescription('指定した場所の天気を調べます')
  .addStringOption(option =>
    option.setName('location')
      .setDescription('例: Tokyo, New York, Osaka')
      .setRequired(true)
  );

export async function execute(interaction) {
  const location = interaction.options.getString('location');
  const apiKey = process.env.OPENWEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric&lang=ja`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      return await interaction.reply(`⚠️ 天気情報を取得できませんでした（場所が見つからない可能性があります）`);
    }

    const embed = new EmbedBuilder()
      .setTitle(`🌤️ ${data.name} の天気`)
      .addFields(
        { name: '天気', value: data.weather[0].description, inline: true },
        { name: '気温', value: `${data.main.temp}°C`, inline: true },
        { name: '体感温度', value: `${data.main.feels_like}°C`, inline: true },
        { name: '湿度', value: `${data.main.humidity}%`, inline: true },
        { name: '風速', value: `${data.wind.speed} m/s`, inline: true }
      )
      .setFooter({ text: 'Powered by OpenWeatherMap' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });

  } catch (error) {
    console.error("🌧️ Weather API error:", error);
    await interaction.reply('⚠️ 天気情報の取得中にエラーが発生しました。');
  }
}
