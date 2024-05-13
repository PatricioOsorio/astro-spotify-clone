<script lang="ts">
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let gretting = "";

  if (currentHour < 12) {
    gretting = "Buenos dias";
  } else if (currentHour < 18) {
    gretting = "Buenas tardes";
  } else {
    gretting = "Buenas noches";
  }
</script>

<h1 class="text-3xl font-bold ">{gretting}</h1>
